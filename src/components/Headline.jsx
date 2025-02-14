
const Headline = ({images , headline , title}) =>{

    return(
        <div>
            <div className="flex justify-center items-center">
            <img src={images} alt={title}/>
            </div>
            <div>
            <h1>{headline}</h1>
            <h2>{title}</h2>
            </div>
        </div>
    )
    
}


export default Headline