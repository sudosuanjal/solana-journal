use anchor_lang::prelude::*;

declare_id!("4JMXT6oZZjNk7Hq1ha55c9Ghx8gykYt9bV1thMk8uu9S");

#[program]
pub mod anchor_program {
    use super::*;
    pub fn create_journal_entry(ctx:Context<CreateEntry>, title:String, message:String)->Result<()>{
      msg!("journal entry created!");
      msg!("title: {}", title);
      msg!("message: {}", message);

      let journal_entry = &mut ctx.accounts.journal_entry;
      journal_entry.owner = ctx.accounts.owner.key();
      journal_entry.title = title;
      journal_entry.message = message;

      Ok(())
    }
}

#[account]
pub struct JournalEntryState{
  pub owner:Pubkey,
  pub title:String,
  pub message:String,
}

#[derive(Accounts)]
#[instruction(title:String,message:String)]
pub struct CreateEntry<'info>{
  #[account(
    init,
    seeds = [title.as_bytes(), owner.key().as_ref()],
    bump,
    payer = owner,
    space = 8 + 32 + 4 + title.len() + message.len()
  )]
  pub journal_entry: Account<'info, JournalEntryState>,
  #[account(mut)]
  pub owner:Signer<'info>,
  pub system_program:Program<'info, System>
}
