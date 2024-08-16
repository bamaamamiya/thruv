import SvgBackgroundDiv from "./SvgBackgroundDiv"


const Garansi = () => {
    return (
        <div>
            <SvgBackgroundDiv/>
            <div className="bg-yellto p-4">
                <div className="flex justify-center items-center">
                    <img
                        src="images/garansi.webp"
                        alt="garansi"
                        className="w-[150px]"
                        width="640" height="360"
                        />
                </div>

                <div>
                    <h1 className="text-redto font-extrabold text-2xl text-center">GARANSI RETURN/UANG KEMBALI</h1>
                    <p className="text-black font-bold text-xl text-center">Jika produk tidak berfungsi/cacat</p>
                </div>

            </div>
            <SvgBackgroundDiv/>
        </div>
    )
}

export default Garansi 