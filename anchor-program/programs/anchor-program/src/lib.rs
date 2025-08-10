use anchor_lang::prelude::*;

declare_id!("4JMXT6oZZjNk7Hq1ha55c9Ghx8gykYt9bV1thMk8uu9S");

#[program]
pub mod anchor_program {
    use super::*;

    pub fn create_journal_entry(
        ctx: Context<CreateEntry>,
        title: String,
        title_hash: [u8; 32],
        message: String,
        mood: Mood,
    ) -> Result<()> {
        if title.as_bytes().len() > 100 {
            return Err(anchor_lang::error::ErrorCode::ConstraintRaw.into());
        }
        if message.as_bytes().len() > 840 {
            return Err(anchor_lang::error::ErrorCode::ConstraintRaw.into());
        }

        let computed_hash = anchor_lang::solana_program::hash::hash(title.as_bytes()).to_bytes();
        if computed_hash != title_hash {
            return Err(anchor_lang::error::ErrorCode::ConstraintRaw.into());
        }

        msg!("journal entry created!");
        msg!("title: {}", title);
        msg!("message: {}", message);
        msg!("mood: {:?}", mood);
        msg!("title_hash: {:?}", title_hash);

        let journal_entry = &mut ctx.accounts.journal_entry;
        journal_entry.owner = ctx.accounts.owner.key();
        journal_entry.title = title;
        journal_entry.message = message;
        journal_entry.mood = mood;
        journal_entry.created_at = Clock::get()?.unix_timestamp;

        Ok(())
    }

    pub fn update_journal_entry(
        ctx: Context<UpdateEntry>,
        title_hash: [u8; 32],
        message: String,
        mood: Mood,
    ) -> Result<()> {
        if message.as_bytes().len() > 840 {
            return Err(anchor_lang::error::ErrorCode::ConstraintRaw.into());
        }

        msg!("journal entry updated");
        msg!("message: {}", message);
        msg!("mood: {:?}", mood);
        msg!("title_hash: {:?}", title_hash);

        let journal_entry = &mut ctx.accounts.journal_entry;
        journal_entry.message = message;
        journal_entry.mood = mood;
        journal_entry.updated_at = Some(Clock::get()?.unix_timestamp);

        Ok(())
    }

    pub fn delete_journal_entry(
        ctx: Context<DeleteEntry>,
        title: String,
        title_hash: [u8; 32],
    ) -> Result<()> {
        let computed_hash = anchor_lang::solana_program::hash::hash(title.as_bytes()).to_bytes();
        if computed_hash != title_hash {
            return Err(anchor_lang::error::ErrorCode::ConstraintRaw.into());
        }

        msg!("journal entry deleted");
        msg!("title: {}", title);
        msg!("title_hash: {:?}", title_hash);

        Ok(())
    }
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug, PartialEq)]
pub enum Mood {
    Awesome,
    Happy,
    Okay,
    Bad,
    Terrible,
}

#[account]
pub struct JournalEntryState {
    pub owner: Pubkey,
    pub title: String,
    pub message: String,
    pub mood: Mood,
    pub created_at: i64,
    pub updated_at: Option<i64>,
}

#[derive(Accounts)]
#[instruction(title: String, title_hash: [u8; 32], message: String, mood: Mood)]
pub struct CreateEntry<'info> {
    #[account(
        init,
        seeds = [title_hash.as_ref(), owner.key().as_ref()],
        bump,
        payer = owner,
        space = 8 + 32 + 4 + 100 + 4 + 840 + 1 + 8 + 9
    )]
    pub journal_entry: Account<'info, JournalEntryState>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(title_hash: [u8; 32], message: String, mood: Mood)]
pub struct UpdateEntry<'info> {
    #[account(
        mut,
        seeds = [title_hash.as_ref(), owner.key().as_ref()],
        bump,
        realloc = 8 + 32 + 4 + 100 + 4 + 840 + 1 + 8 + 9,
        realloc::payer = owner,
        realloc::zero = true
    )]
    pub journal_entry: Account<'info, JournalEntryState>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(title: String, title_hash: [u8; 32])]
pub struct DeleteEntry<'info> {
    #[account(
        mut,
        seeds = [title_hash.as_ref(), owner.key().as_ref()],
        bump,
        close = owner
    )]
    pub journal_entry: Account<'info, JournalEntryState>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}