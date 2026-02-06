export type DiscussionCategory = "all" | "questions" | "projects" | "resources" | "code"

export interface Discussion {
  id: string
  title: string
  author: string
  authorAvatar: string
  authorRole: string
  category: DiscussionCategory
  tags: string[]
  content: string
  likes: number
  replies: number
  views: number
  isPinned: boolean
  hasAcceptedAnswer: boolean
  createdAt: string
  lastActivity: string
}

export interface CommunityActivity {
  id: number
  user: string
  avatar: string
  action: string
  target: string
  time: string
  reactions: number
}

export interface TopContributor {
  name: string
  avatar: string
  posts: number
  likes: number
}

export interface TrendingTopic {
  topic: string
  posts: number
}
