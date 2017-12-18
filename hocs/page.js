import { compose } from 'recompose'

import withApolloClient from './withApolloClient'
import withLayout from './withLayout'

export default compose(withApolloClient, withLayout)
