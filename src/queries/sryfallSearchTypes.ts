type ScryfallCardSearchResponse = {
  object: string
  total_cards: number
  has_more: boolean
  data: SryfallCard[]
}

type SryfallCard = {
  object: string
  id: string
  oracle_id: string
  multiverse_ids: number[]
  mtgo_id?: number
  mtgo_foil_id?: number
  tcgplayer_id: number
  cardmarket_id: number
  name: string
  lang: string
  released_at: string
  uri: string
  scryfall_uri: string
  layout: string
  highres_image: boolean
  image_status: string
  image_uris?: ImageUris
  mana_cost: string
  cmc: number
  type_line: string
  oracle_text: string
  colors: string[]
  color_identity: string[]
  keywords: string[]
  all_parts?: AllPart[]
  legalities: Legalities
  games: string[]
  reserved: boolean
  foil: boolean
  nonfoil: boolean
  finishes: string[]
  oversized: boolean
  promo: boolean
  reprint: boolean
  variation: boolean
  set_id: string
  set: string
  set_name: string
  set_type: string
  set_uri: string
  set_search_uri: string
  scryfall_set_uri: string
  rulings_uri: string
  prints_search_uri: string
  collector_number: string
  digital: boolean
  rarity: string
  card_back_id: string
  artist: string
  artist_ids: string[]
  illustration_id: string
  border_color: string
  frame: string
  security_stamp?: string
  full_art: boolean
  textless: boolean
  booster: boolean
  story_spotlight: boolean
  edhrec_rank?: number
  penny_rank?: number
  prices: Prices
  related_uris: RelatedUris
  purchase_uris: PurchaseUris
  tcgplayer_etched_id?: number
  watermark?: string
  flavor_text?: string
  preview?: Preview
  arena_id?: number
  power?: string
  toughness?: string
  frame_effects?: string[]
}

type ImageUris = {
  small: string
  normal: string
  large: string
  png: string
  art_crop: string
  border_crop: string
}

type AllPart = {
  object: string
  id: string
  component: string
  name: string
  type_line: string
  uri: string
}

type Legalities = {
  standard: string
  future: string
  historic: string
  gladiator: string
  pioneer: string
  explorer: string
  modern: string
  legacy: string
  pauper: string
  vintage: string
  penny: string
  commander: string
  oathbreaker: string
  brawl: string
  historicbrawl: string
  alchemy: string
  paupercommander: string
  duel: string
  oldschool: string
  premodern: string
  predh: string
}

type Prices = {
  usd: string
  usd_foil?: string
  usd_etched?: string
  eur: string
  eur_foil?: string
  tix?: string
}

type RelatedUris = {
  gatherer: string
  tcgplayer_infinite_articles: string
  tcgplayer_infinite_decks: string
  edhrec: string
}

type PurchaseUris = {
  tcgplayer: string
  cardmarket: string
  cardhoarder: string
}

type Preview = {
  source: string
  source_uri: string
  previewed_at: string
}

export type { ScryfallCardSearchResponse }
