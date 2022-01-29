import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: string;
};

export type CreateProjectInput = {
  name: Scalars["String"];
  teamId: Scalars["ID"];
};

export type Mutation = {
  __typename: "Mutation";
  createProject: Project;
  logout: SuccessResponse;
  requestLoginCode: SuccessResponse;
  signup: SuccessResponse;
  verifyLoginCode: User;
};

export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};

export type MutationRequestLoginCodeArgs = {
  email: Scalars["String"];
};

export type MutationSignupArgs = {
  input: SignupInput;
};

export type MutationVerifyLoginCodeArgs = {
  code: Scalars["String"];
  email: Scalars["String"];
};

export type PaginationInput = {
  cursor?: InputMaybe<Scalars["String"]>;
  page?: InputMaybe<Scalars["Int"]>;
  skip?: InputMaybe<Scalars["Int"]>;
  take?: InputMaybe<Scalars["Int"]>;
};

export type Project = {
  __typename: "Project";
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  name: Scalars["String"];
  team: Team;
  teamId: Scalars["ID"];
  updatedAt: Scalars["DateTime"];
};

export type Query = {
  __typename: "Query";
  me?: Maybe<User>;
  project?: Maybe<Project>;
  team?: Maybe<Team>;
};

export type QueryProjectArgs = {
  id: Scalars["ID"];
};

export type QueryTeamArgs = {
  id: Scalars["ID"];
};

export type Session = {
  __typename: "Session";
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  token: Scalars["String"];
  userAgent: Scalars["String"];
};

export type SignupInput = {
  email: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
};

export type SuccessResponse = {
  __typename: "SuccessResponse";
  success: Scalars["Boolean"];
};

export type Team = {
  __typename: "Team";
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  invites: Array<TeamInvite>;
  memberships: Array<TeamMembership>;
  name: Scalars["String"];
  projects: Array<Project>;
  updatedAt: Scalars["DateTime"];
};

export type TeamInvite = {
  __typename: "TeamInvite";
  createdAt: Scalars["DateTime"];
  email: Scalars["String"];
  id: Scalars["ID"];
  invitedBy: User;
  invitedById: Scalars["ID"];
  team: Team;
  teamId: Scalars["ID"];
};

export type TeamMembership = {
  __typename: "TeamMembership";
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  role: TeamRoles;
  team: Team;
  teamId: Scalars["ID"];
  updatedAt: Scalars["DateTime"];
  user: User;
  userId: Scalars["ID"];
};

export enum TeamRoles {
  ADMIN = "ADMIN",
  BILLING = "BILLING",
  MEMBER = "MEMBER",
}

export type User = {
  __typename: "User";
  confirmedAt?: Maybe<Scalars["DateTime"]>;
  createdAt: Scalars["DateTime"];
  email: Scalars["String"];
  firstName: Scalars["String"];
  id: Scalars["ID"];
  lastName: Scalars["String"];
  role: UserRoles;
  sessions: Array<Session>;
  teamInvites: Array<TeamInvite>;
  teamMemberships: Array<TeamMembership>;
  updatedAt: Scalars["DateTime"];
};

export enum UserRoles {
  MADE = "MADE",
  SUPPORT = "SUPPORT",
  USER = "USER",
}

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename: "Query";
  me?:
    | {
        __typename: "User";
        id: string;
        email: string;
        firstName: string;
        lastName: string;
      }
    | null
    | undefined;
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = {
  __typename: "Mutation";
  logout: { __typename: "SuccessResponse"; success: boolean };
};

export type RequestLoginCodeMutationVariables = Exact<{
  email: Scalars["String"];
}>;

export type RequestLoginCodeMutation = {
  __typename: "Mutation";
  requestLoginCode: { __typename: "SuccessResponse"; success: boolean };
};

export type VerifyLoginCodeMutationVariables = Exact<{
  email: Scalars["String"];
  code: Scalars["String"];
}>;

export type VerifyLoginCodeMutation = {
  __typename: "Mutation";
  verifyLoginCode: {
    __typename: "User";
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
};

export type SignUpMutationVariables = Exact<{
  input: SignupInput;
}>;

export type SignUpMutation = {
  __typename: "Mutation";
  signup: { __typename: "SuccessResponse"; success: boolean };
};

export const MeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Me" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "me" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const LogoutDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Logout" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "logout" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "success" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const RequestLoginCodeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RequestLoginCode" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "email" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "requestLoginCode" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "email" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "email" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "success" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RequestLoginCodeMutation,
  RequestLoginCodeMutationVariables
>;
export const VerifyLoginCodeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "VerifyLoginCode" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "email" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "code" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "verifyLoginCode" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "email" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "email" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "code" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "code" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  VerifyLoginCodeMutation,
  VerifyLoginCodeMutationVariables
>;
export const SignUpDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SignUp" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "SignupInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "signup" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "success" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>;
