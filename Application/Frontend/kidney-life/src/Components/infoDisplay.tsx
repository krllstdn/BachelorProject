import React from 'react';


type InfoDisplayProps = {
    data: {
        header: string;
        fields: {
            [key: string]: string;
        };
    },
    styles?: string,
    textSize?: string,
};


InfoDisplay.defaultProps = {
    textSize: "text-3xl",
}


function InfoDisplay(props: InfoDisplayProps) {
    const { data } = props;

    return (
        <div className="info-display flex-grow mt-2">
            <div className={"bg-secondary rounded-md text-lg relative "+props.styles} >
                <h2 className={props.textSize+' font-semibold mb-3'}>{data.header}</h2>
                <ul>
                    {Object.entries(data.fields).map(([key, value]) => (
                        <li key={key} className='text-xl mb-1'>
                            <strong>{key}:</strong> {value}
                        </li>
                    ))}
                </ul>
                <button className="absolute top-0 right-0 text-primary p-8 pt-8
                                    text-3xl" type="button" 
                                    onClick={()=>{}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                        </svg>

                                    </button>
            </div>
        </div>
    );
}

export default InfoDisplay;

