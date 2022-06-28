import React from "react";
import { FormInput } from "../Form";
import Button from "../button";
import Loader from "../Loader";
import GoogleLoginButton from "../button/GoogleLogin";

/**
 * 로그인 프레젠터 컴포넌트
 *
 * @param {boolean}  props.loading  로그인 요청 여부
 * @param {object}   props.email    이메일
 * @param {object}   props.password 암호
 * @param {function} props.onSubmit 요청 핸들러
 */
const SignInPresenter = ({ loading, email, password, onSubmit }) => (
    <div>
        {loading && <Loader />}
        <form onSubmit={onSubmit}>
            <FormInput
                type="email"
                placeholder="이메일을 입력하세요"
                id="email"
                autoComplete="off"
                required
                label="이메일"
                isAlone={true}
                {...email}
            />
            <FormInput
                type="password"
                placeholder="암호를 입력하세요"
                id="password"
                autoComplete="off"
                label="암호"
                isAlone={true}
                {...password}
            />
            <Button type="submit">로그인</Button>
        </form>
        <GoogleLoginButton />
    </div>
);

export default SignInPresenter;
