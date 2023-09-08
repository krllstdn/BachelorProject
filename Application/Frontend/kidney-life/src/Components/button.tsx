
type ButtonProps = {
    name: string
}

export default function Button({name}: ButtonProps) {
    return (
        <div className="add-pair-button mt-6"> 
            <button className="bg-primary rounded-md p-2 w-full text-white">
                {name}
            </button>
        </div>
    )
}

