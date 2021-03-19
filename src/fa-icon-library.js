import { library } from '@fortawesome/fontawesome-svg-core'
import { 
    faUserMinus, 
    faAngleDown, 
    faAngleUp,
    faUserPlus,
    faBan
    } from '@fortawesome/free-solid-svg-icons'

function loadIcons() {
    library.add(
        faUserMinus, 
        faAngleDown, 
        faAngleUp,
        faUserPlus,
        faBan);
}

export default loadIcons;
