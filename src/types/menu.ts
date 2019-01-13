import { DESSERT } from '@/types/desserts'
import { INGREDIENT } from '@/types/ingredients'
import { FLAVOR } from '@/types/jam-flavors'

export interface Menu {
    id?: string
    ingredients: INGREDIENT[],
    dessert: DESSERT | undefined,
    mirror: boolean,
    flavor?: FLAVOR | undefined,
}
