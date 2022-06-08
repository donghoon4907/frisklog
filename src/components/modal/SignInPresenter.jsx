import React from "react";
import { FormInput } from "../Form";
import Button from "../Button";
import Loader from "../Loader";

/**
 * 로그인 프레젠터 컴포넌트
 *
 * @param props.loading 로그인 요청 진행 여부
 * @param props.email 이메일 입력을 위한 Hooks
 * @param props.onSubmit 로그인 요청 핸들러
 */
const SignInPresenter = ({ loading, email, onSubmit }) => (
    <>
        {loading && <Loader />}
        <form onSubmit={onSubmit}>
            <FormInput
                type="email"
                placeholder="이메일을 입력하세요."
                id="email"
                autoComplete="off"
                required
                label="이메일"
                {...email}
            />
            <Button type="submit">로그인</Button>
        </form>
    </>
);

export default SignInPresenter;
