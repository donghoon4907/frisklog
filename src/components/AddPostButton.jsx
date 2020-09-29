import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Add } from '../icons'
import { useDispatch } from '../context'
import { SHOW_LOGIN_MODAL } from '../context/action'
import { TOKEN_KEY, getStorage } from '../lib/state'

const Container = styled.div`
    ${(props) => props.theme.media.tablet} {
        display: none;
    }
`

/**
 * 헤더 게시물 추가 컴포넌트
 *
 * @Component
 * @author frisk
 */
const AddPostButton = () => {
    /**
     * history 객체 활성화
     */
    const history = useHistory()
    /**
     * 로컬 상태 변경 모듈 활성화
     */
    const dispatch = useDispatch()
    /**
     * 클릭 핸들러
     */
    const handleClick = useCallback(() => {
        /**
         * 토큰 로드
         */
        const token = getStorage(TOKEN_KEY)

        if (token) {
            /**
             * 게시물 작성 페이지로 이동
             */
            history.push('/create')
        } else {
            /**
             * 로그인 팝업 보이기
             */
            dispatch({
                type: SHOW_LOGIN_MODAL,
            })
        }
    }, [])

    return (
        <Container onClick={handleClick} title="포스트 등록">
            <Add />
        </Container>
    )
}

export default AddPostButton
