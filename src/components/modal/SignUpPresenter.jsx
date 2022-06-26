import React from "react";
import { FormInput } from "../Form";
import Button from "../button";
import Loader from "../Loader";
import { Thumbnail } from "../../assets/icon";

/**
 * 회원가입 프레젠터 컴포넌트
 *
 * @param {boolean}      props.uploadLoading 업로드 요청 진행 여부
 * @param {boolean}      props.signUpLoading 회원가입 요청 진행 여부
 * @param {object}       props.nickname      별칭
 * @param {object}       props.email         이메일
 * @param {string}       props.preview       이미지 미리보기
 * @param {React.useRef} props.$file         file element
 * @param {function}     props.onChangeFile  파일 변경 핸들러
 * @param {function}     props.onClickFile   파일 클릭 핸들러
 * @param {function}     props.onSubmit      회원가입 요청 핸들러
 */
const SignUpPresenter = ({
    uploadLoading,
    signUpLoading,
    nickname,
    email,
    password,
    preview,
    $file,
    onChangeFile,
    onClickFile,
    onSubmit
}) => {
    return (
        <>
            {(uploadLoading || signUpLoading) && <Loader />}
            <form onSubmit={onSubmit}>
                <div
                    className="fr-modal-auth__upload"
                    onClick={onClickFile}
                    role="button"
                    tabIndex="0"
                >
                    {preview ? (
                        <img
                            src={preview}
                            alt="avatar"
                            title="변경하려면 클릭하세요."
                        />
                    ) : (
                        <Thumbnail style={{ width: 100, height: 50 }} />
                    )}

                    <input
                        type="file"
                        onChange={onChangeFile}
                        ref={$file}
                        hidden
                        accept="image/jpg, image/jpeg, image/png, .gif"
                    />
                    <span className="a11y-hidden">
                        {preview ? "재업로드" : "업로드"}
                    </span>
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
