import React from 'react'

const ButtonComponent = ({bg,title,type='submit'}) => {
    return (
        <div className={`w-full $ rounded-lg ${bg} `}>
            <button type={type} className='font-bold w-full h-full'>{title}</button>
        </div>
      )
}

export default ButtonComponent