import { type SchemaTypeDefinition } from 'sanity'
import { categoryType } from './catergoryType'
import { blockContentType } from './blockCT'
import { productType } from './productType'
import { orderType } from './orderT'
import { brandType } from './brandT'
import { blogType } from './BlogT'
import { blogCategoryType } from './blogCT'
import { authorType } from './authorT'
import { addressType } from './addressT'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType, blockContentType,productType,orderType,brandType,blogType,blogCategoryType,authorType,addressType],
}
