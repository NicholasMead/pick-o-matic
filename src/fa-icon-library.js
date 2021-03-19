import { library } from '@fortawesome/fontawesome-svg-core'
import * as icons from '@fortawesome/free-solid-svg-icons'

function loadIcons() {
    library.add(
        icons.faUserMinus, 
        icons.faAngleDown, 
        icons.faAngleUp,
        icons.faUserPlus,
        icons.faBan,
        icons.faCheck);
}

export default loadIcons;
