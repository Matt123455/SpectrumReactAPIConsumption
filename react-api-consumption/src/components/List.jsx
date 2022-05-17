const List = (props) => {
    function handleClick(){
        props.deletion(props.id)
    }

    return (
        <div className="product">
            <h1 >  Title: {props.name} </h1>
            <p > Price: {props.price}</p>
            <p > Description: {props.description}</p>
            <p > Slug: {props.slug}</p>
            <button onClick={handleClick}>Delete</button>
        </div>
    )
}

export default List