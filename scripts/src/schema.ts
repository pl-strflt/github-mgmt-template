import {Expose, Type} from 'class-transformer'

export class RepositoryPagesSource {
  @Expose() branch?: string
  @Expose() path?: string
}

export class RepositoryPages {
  @Type(() => RepositoryPagesSource)
  @Expose()
  source?: RepositoryPagesSource
  @Expose() cname?: string
}

export class RepositoryTemplate {
  @Expose() owner?: string
  @Expose() repository?: string
}

export class Repository {
  @Expose() allow_auto_merge?: boolean
  @Expose() allow_merge_commit?: boolean
  @Expose() allow_rebase_merge?: boolean
  @Expose() allow_squash_merge?: boolean
  @Expose() archive_on_destroy?: boolean
  @Expose() archived?: boolean
  @Expose() auto_init?: boolean
  @Expose() default_branch?: string
  @Expose() delete_branch_on_merge?: boolean
  @Expose() description?: string
  @Expose() gitignore_template?: string
  @Expose() has_downloads?: boolean
  @Expose() has_issues?: boolean
  @Expose() has_projects?: boolean
  @Expose() has_wiki?: boolean
  @Expose() homepage_url?: string
  @Expose() ignore_vulnerability_alerts_during_read?: boolean
  @Expose() is_template?: boolean
  @Expose() license_template?: string
  @Type(() => RepositoryPages)
  @Expose()
  pages?: RepositoryPages
  @Type(() => RepositoryTemplate)
  @Expose()
  template?: RepositoryTemplate
  @Expose() topics?: string[]
  @Expose() visibility?: string
  @Expose() vulnerability_alerts?: boolean
}

export class File {
  @Expose() content?: string
  @Expose() overwrite_on_create?: boolean
}

export class BranchProtectionRequiredPullRequestReviews {
  @Expose() dismiss_stale_reviews?: boolean
  @Expose() dismissal_restrictions?: string[]
  @Expose() pull_request_bypassers?: string[]
  @Expose() require_code_owner_reviews?: boolean
  @Expose() required_approving_review_count?: number
  @Expose() restrict_dismissals?: boolean
}

export class BranchProtectionRequiredStatusChecks {
  @Expose() contexts?: string[]
  @Expose() strict?: boolean
}

export class BranchProtection {
  @Expose() allows_deletions?: boolean
  @Expose() allows_force_pushes?: boolean
  @Expose() enforce_admins?: boolean
  @Expose() push_restrictions?: string[]
  @Expose() require_conversation_resolution?: boolean
  @Expose() require_signed_commits?: boolean
  @Expose() required_linear_history?: boolean
  @Type(() => BranchProtectionRequiredPullRequestReviews)
  @Expose()
  required_pull_request_reviews?: BranchProtectionRequiredPullRequestReviews
  @Type(() => BranchProtectionRequiredStatusChecks)
  @Expose()
  required_status_checks?: BranchProtectionRequiredStatusChecks
}

export class RepositoryCollaborator extends String {}
export class RepositoryTeam extends String {}

class RepositoryContainer extends Repository {
  collaborators?: {
    admin?: RepositoryCollaborator[]
    maintain?: RepositoryCollaborator[]
    push?: RepositoryCollaborator[]
    triage?: RepositoryCollaborator[]
    pull?: RepositoryCollaborator[]
  }
  teams?: {
    admin?: RepositoryTeam[]
    maintain?: RepositoryTeam[]
    push?: RepositoryTeam[]
    triage?: RepositoryTeam[]
    pull?: RepositoryTeam[]
  }
  files?: Record<string, File>
  branch_protection?: Record<string, BranchProtection>
}

export class Team {
  @Expose() create_default_maintainer?: boolean
  @Expose() description?: string
  @Expose() parent_team_id?: string
  @Expose() privacy?: 'closed' | 'secret'
}

export class TeamMember extends String {}

class TeamContainer extends Team {
  members?: {
    maintainer?: TeamMember[]
    member?: TeamMember[]
  }
}

export class Member extends String {}

export class Schema {
  members?: {
    admin?: Member[]
    member?: Member[]
  }
  repositories?: Record<string, RepositoryContainer>
  teams?: Record<string, TeamContainer>
}
