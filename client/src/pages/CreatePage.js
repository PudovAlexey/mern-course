import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import { useHttp } from '../hooks/http.hook'

export const CreatePage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const { request } = useHttp()
    const [link, setLink] = useState('')

    const pressHandler = async event => {
        if (event.key === 'Enter') {
          try {
            const data = await request('/api/link/generate', 'POST', {from: link}, {
              Authorization: `Bearer ${auth.token}`
            })
            history.push(`/detail/${data.link._id}`)
          } catch (e) {}
        }
      }
    return (
        <div className="row">
            <div className=".col s8 offset-s2" style={{ paddingTop: '2rem' }}>
                <div className="input-field">
                    <label htmlFor="link" for="password">Введите ссылку</label>
                    <input name="password"
                        placeholder="Вставьте ссылку"
                        id="link"
                        type="text"
                        onChange={e => setLink(e.target.value)}
                        onKeyPress={pressHandler} />
                </div>
            </div>
        </div>
    )
}