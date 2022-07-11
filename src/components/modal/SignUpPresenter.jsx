import React from "react";
import { FormInput } from "../Form";
import Button from "../button";
import Loader from "../Loader";
import UploadImage from "../UploadImage";

/**
 * 회원가입 프레젠터 컴포넌트
 *
 * @param {boolean}  props.loading  회원가입 요청 진행 여부
 * @param {object}   props.nickname 별칭
 * @param {object}   props.email    이메일
 * @param {function} props.onSubmit 회원가입 요청 핸들러
 */
const SignUpPresenter = ({ loading, nickname, email, password, onSubmit }) => {
    return (
        <>
            {loading && <Loader />}
            <form onSubmit={onSubmit}>
                <div className="fr-modal__upload">
                    <UploadImage isActiveUpload={true} />
                </div>
                <FormInput
                    type="email"
                    placeholder="이메일을 입력하세요"
                    id="email"
                    autoComplete="off"
                    required
                    isAlone={true}
                    {...email}
                    label="이메일"
                />
                <FormInput
                    type="password"
                    placeholder="암호를 입력하세요"
                    id="password"
                    autoComplete="off"
                    required
                    isAlone={true}
                    {...password}
                    label="암호"
                />
                <FormInput
                    placeholder="닉네임을 입력하세요"
                    required
                    id="nickname"
                    isAlone={true}
                    {...nickname}
                    autoComplete="off"
                    label="닉네임"
                />
                <Button type="submit">회원가입</Button>
            </form>
        </>
    );
};

export default SignUpPresenter;
