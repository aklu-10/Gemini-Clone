import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import './Sidebar.css'
import { Context } from '../../context/Context'

const Sidebar = () => {
  const [extended, setExtended] = useState(false)
  const { onSent, previousPrompts, setRecentPrompt, newChat } =
    useContext(Context)

  const loadPrompt = async prompt => {
    setRecentPrompt(prompt)
    onSent(prompt)
  }

  return (
    <div className='sidebar'>
      <div className='top'>
        <img
          className='menu'
          src={assets.menu_icon}
          alt=''
          onClick={() => setExtended(pre => !pre)}
        />

        <div className='new-chat' onClick={newChat}>
          <img src={assets.plus_icon} alt='' />
          {extended && <p>New Chat</p>}
        </div>

        {extended && (
          <div className='recent'>
            <p className='recent-title'>Recent</p>
            {previousPrompts.map((item, index) => (
              <div
                className='recent-entry'
                key={index}
                onClick={() => loadPrompt(item)}
              >
                <img src={assets.message_icon} alt='' />
                <p>{item.slice(0, 18)} ...</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className='bottom'>
        <div className='bottom-item recent-entry'>
          <img src={assets.question_icon} alt='' />
          {extended && <p>Help</p>}
        </div>

        <div className='bottom-item recent-entry'>
          <img src={assets.history_icon} alt='' />
          {extended && <p>Activity</p>}
        </div>

        <div className='bottom-item recent-entry'>
          <img src={assets.setting_icon} alt='' />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
