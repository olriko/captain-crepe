import axios from 'axios'

export const notification =  async (text: string) => {
    console.log(process.env)
    if (process.env.VUE_APP_SLACK_HOOK) {
        try {
            await axios.post(process.env.VUE_APP_SLACK_HOOK, {
                username: 'Captain Haddock',
                text,
            })
        } catch (error) {
            console.error(error)
        }
    }
}
