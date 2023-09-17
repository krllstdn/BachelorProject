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
            <div className={"bg-secondary rounded-md text-lg "+props.styles} >
                <h2 className={props.textSize+' font-semibold mb-3'}>{data.header}</h2>
                <ul>
                    {Object.entries(data.fields).map(([key, value]) => (
                        <li key={key} className='text-xl mb-1'>
                            <strong>{key}:</strong> {value}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default InfoDisplay;

