import React from 'react'

const ButtonComponent = ({bg,title,type='submit',onclick}) => {
    return (
        <div className={`w-full $ rounded-lg ${bg} `}>
            <button onClick={onclick} type={type} className='font-bold w-full h-full'>{title}</button>
        </div>
      )
}

export default ButtonComponent