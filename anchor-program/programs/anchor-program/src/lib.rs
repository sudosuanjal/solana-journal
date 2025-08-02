use anchor_lang::prelude::*;

declare_id!("4JMXT6oZZjNk7Hq1ha55c9Ghx8gykYt9bV1thMk8uu9S");

#[program]
pub mod anchor_program {
    use super::*;

    pub fn create_journal_entry(ctx: Context<CreateEntry>, title: String, message: String, mood:Mood) -> Result<()> {
        msg!("journal entry created!");
        msg!("title: {}", title);
        msg!("message: {}", message);
        msg!("mood: {:?}", mood);

        let journal_entry = &mut ctx.accounts.journal_entry;
        journal_entry.owner = ctx.accounts.owner.key();
        journal_entry.title = title;
        journal_entry.message = message;
        journal_entry.mood = mood;
        journal_entry.created_at = Clock::get()?.unix_timestamp;

        Ok(())
    }

    pub fn update_journal_entry(ctx: Context<UpdateEntry>, title: String, message: String, mood:Mood) -> Result<()> {
        msg!("journal entry updated");
        msg!("title: {}", title);
        msg!("message: {}", message);
        msg!("mood: {:?}", mood);

        let journal_entry = &mut ctx.accounts.journal_entry;
        journal_entry.message = message;
        journal_entry.mood = mood;
        journal_entry.updated_at = Some(Clock::get()?.unix_timestamp);
        Ok(())
    }

    pub fn delete_journal_entry(_ctx: Context<DeleteEntry>, title: String) -> Result<()> {
        msg!("journal entry deleted");
        msg!("title: {}", title);
        Ok(())
    }
}

#[derive(AnchorSerialize, AnchorDeserialize,Clone,Debug,PartialEq)]
pub enum  Mood {
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
    pub updated_at:Option<i64>
}


#[derive(Accounts)]
#[instruction(title: String, message: String, mood:Mood)]
pub struct CreateEntry<'info> {
    #[account(
        init,
        seeds = [title.as_bytes(), owner.key().as_ref()],
        bump,
        payer = owner,
        space = 8 + 32 + 4 + title.len() + 4 + message.len() + 1 + 8 + 9
    )]
    pub journal_entry: Account<'info, JournalEntryState>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(title: String, message: String, mood:Mood)]
pub struct UpdateEntry<'info> {
    #[account(
        mut,
        seeds = [title.as_bytes(), owner.key().as_ref()],
        bump,
        realloc = 8 + 32 + 4 + title.len() + 4 + message.len() + 1 + 8 + 9,
        realloc::payer = owner,
        realloc::zero = true,
    )]
    pub journal_entry: Account<'info, JournalEntryState>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(title: String)]
pub struct DeleteEntry<'info> {
    #[account(
        mut,
        seeds = [title.as_bytes(), owner.key().as_ref()],
        bump,
        close = owner
    )]
    pub journal_entry: Account<'info, JournalEntryState>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}