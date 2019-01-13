import axios from 'axios'

export const notification =  async (text: string) => {
    if (process.env.VUE_APP_SLACK_HOOK) {
        try {
            await axios.post(process.env.VUE_APP_SLACK_HOOK, {
                username: 'Captain Haddock',
                text,
                link_names: true,
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
        } catch (error) {
            console.error(error)
        }
    }
}
