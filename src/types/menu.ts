import { DESSERT } from '@/types/desserts'
import { INGREDIENT } from '@/types/ingredients'

export interface Menu {
    id?: string
    ingredients: INGREDIENT[],
    dessert: DESSERT | null,
    mirror: boolean,
}
