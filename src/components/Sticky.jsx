import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCartShopping } from '@fortawesome/free-solid-svg-icons'

const Sticky = () => {
    return(
        <div className='sticky bottom-0 bg-redto p-2 rounded-xl '>
            <div className="text-center space-x-2 text-white">
            <FontAwesomeIcon icon={faCartShopping} />
            <a className="text-xl font-semibold" href='#form'>
                Ambil Promo ( BISA COD )
            </a>
            </div>
        </div>
    )
}

export default Sticky