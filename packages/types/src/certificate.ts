export type CertificateStatus = "minted" | "pending" | "in-progress"
export type BadgeRarity = "Legendary" | "Epic" | "Rare" | "Common"

export interface Certificate {
  id: string
  title: string
  type: string
  issueDate: string
  nftId?: string
  polygonLink?: string
  verified: boolean
  skills: string[]
  grade: string
  image: string
  status: CertificateStatus
}

export interface Badge {
  id: string
  name: string
  icon: string
  rarity: BadgeRarity
  earned: boolean
}

export interface WalletInfo {
  address: string
  network: string
  totalNFTs: number
  totalValue: string
}
