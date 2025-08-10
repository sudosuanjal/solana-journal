/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/anchor_program.json`.
 */
export type AnchorProgram = {
  address: "4JMXT6oZZjNk7Hq1ha55c9Ghx8gykYt9bV1thMk8uu9S";
  metadata: {
    name: "anchorProgram";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "createJournalEntry";
      discriminator: [48, 65, 201, 186, 25, 41, 127, 0];
      accounts: [
        {
          name: "journalEntry";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "arg";
                path: "titleHash";
              },
              {
                kind: "account";
                path: "owner";
              }
            ];
          };
        },
        {
          name: "owner";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "title";
          type: "string";
        },
        {
          name: "titleHash";
          type: {
            array: ["u8", 32];
          };
        },
        {
          name: "message";
          type: "string";
        },
        {
          name: "mood";
          type: {
            defined: {
              name: "mood";
            };
          };
        }
      ];
    },
    {
      name: "deleteJournalEntry";
      discriminator: [156, 50, 93, 5, 157, 97, 188, 114];
      accounts: [
        {
          name: "journalEntry";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "arg";
                path: "titleHash";
              },
              {
                kind: "account";
                path: "owner";
              }
            ];
          };
        },
        {
          name: "owner";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "title";
          type: "string";
        },
        {
          name: "titleHash";
          type: {
            array: ["u8", 32];
          };
        }
      ];
    },
    {
      name: "updateJournalEntry";
      discriminator: [113, 164, 49, 62, 43, 83, 194, 172];
      accounts: [
        {
          name: "journalEntry";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "arg";
                path: "titleHash";
              },
              {
                kind: "account";
                path: "owner";
              }
            ];
          };
        },
        {
          name: "owner";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "titleHash";
          type: {
            array: ["u8", 32];
          };
        },
        {
          name: "message";
          type: "string";
        },
        {
          name: "mood";
          type: {
            defined: {
              name: "mood";
            };
          };
        }
      ];
    }
  ];
  accounts: [
    {
      name: "journalEntryState";
      discriminator: [113, 86, 110, 124, 140, 14, 58, 66];
    }
  ];
  types: [
    {
      name: "journalEntryState";
      type: {
        kind: "struct";
        fields: [
          {
            name: "owner";
            type: "pubkey";
          },
          {
            name: "title";
            type: "string";
          },
          {
            name: "message";
            type: "string";
          },
          {
            name: "mood";
            type: {
              defined: {
                name: "mood";
              };
            };
          },
          {
            name: "createdAt";
            type: "i64";
          },
          {
            name: "updatedAt";
            type: {
              option: "i64";
            };
          }
        ];
      };
    },
    {
      name: "mood";
      type: {
        kind: "enum";
        variants: [
          {
            name: "awesome";
          },
          {
            name: "happy";
          },
          {
            name: "okay";
          },
          {
            name: "bad";
          },
          {
            name: "terrible";
          }
        ];
      };
    }
  ];
};
