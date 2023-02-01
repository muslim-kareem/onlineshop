
export default function ProductContainer({children}:{
    children: React.ReactNode
}){

    return(

        <div className="product-container">
            <div className={"d-flex align-content-start flex-wrap  mb-5 "}>
                <>{children}</>
            </div>
        </div>
    )
}