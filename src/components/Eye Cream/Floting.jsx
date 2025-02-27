
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

const Floting = () => {

    return (
        <div className='sticky bottom-0 w-full bg-white p-2'>
            <div className="bg-redto text-white rounded-lg">
                <div className='space-x-2 font-bold p-2 flex justify-center items-center'>
                    <FontAwesomeIcon icon={faCartShopping} />
                    <a href='#formulir'>AMBIL PROMO ( BISA COD )</a>
                </div>
            </div>
        </div>
    )
}

export default Floting