import React from 'react';


type InfoDisplayProps = {
    data: {
        header: string;
        fields: {
            [key: string]: string;
        };
    };
};



function InfoDisplay(props: InfoDisplayProps) {
    const { data } = props;

    return (
        <div className="info-display flex-grow mt-2">
            <div className="bg-secondary m-3 mb-0 p-12 pb-28 rounded-md text-lg 
                            ">
                <h2 className='text-3xl font-semibold mb-2'>{data.header}</h2>
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

