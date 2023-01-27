
export default function ProductContainer({children}:{
    children: React.ReactNode
}){

    return(

        <div className="product-container">
            <div className={"d-flex align-content-start flex-wrap  mb-5 "}>
            {/*{products.map(p => <div key={p.id} className={"product-card"}><ProductCard   product={p}/></div>)}*/}
                       <>{children}</>

            </div>
        </div>
    )
}