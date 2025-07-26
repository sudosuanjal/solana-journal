use anchor_lang::prelude::*;

declare_id!("4JMXT6oZZjNk7Hq1ha55c9Ghx8gykYt9bV1thMk8uu9S");

#[program]
pub mod anchor_program {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
