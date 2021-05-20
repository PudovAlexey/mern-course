import React, { useCallback, useState, useContext, useEffect } from 'react'
import {useHttp} from '../hooks/http.hook'
import {Loader} from '../components/Loader'
import {LinksList} from '../components/LinksList'
import { AuthContext } from '../context/authContext'

export const LinksPage = () => {

    const [links, setLinks]=  useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchLinks = useCallback(async () => {
        try {
            const fetched = await request('/api/link/', "GET", null, {
                Authorization: `Bearer ${token}`
            })

            setLinks(fetched)
        } catch (e) {
            console.log(e)
        }
    }, [token, request])

    useEffect(() => {

        console.log(links)
        fetchLinks()
    }, [fetchLinks])

    if (loading) {
        return <Loader/>
    }
    return (
        <>
        {!loading && <LinksList links={links}/>}
        </>
    )
}