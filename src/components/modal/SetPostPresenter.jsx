import React from "react";
import { Modal, Button } from "react-bootstrap";
import { FormInput } from "../Form";
import Loader from "../Loader";
import Editor from "../Editor";
import CategoryBtn from "../button/Category";

/**
 * 게시물 등록 모달 컨테이너 컴포넌트
 *
 * @param props.loading
 * @param props.category
 * @param props.setContent
 * @param props.onClose
 * @param props.onSubmit
 * @param props.onBlur
 */
const SetPostPresenter = ({
    loading,
    category,
    setContent,
    onClose,
    onSubmit,
    onChange
}) => (
    <Modal onHide={onClose} show animation={false}>
        {loading && <Loader />}
        <Modal.Header closeButton>
            <Modal.Title>게시물 등록</Modal.Title>
        </Modal.Header>
        <form onSubmit={onSubmit}>
            <Modal.Body>
                <Editor
                    height="50vh"
                    onChange={(content) => setContent(content)}
                />
                <FormInput
                    placeholder="카테고리를 입력하세요"
                    id="category"
                    required
                    autoComplete="off"
                    {...category}
                    label="카테고리"
                    onChange={onChange}
                >
                    <ul style={{ marginLeft: 10, flex: 1 }}>
                        {category.value.length > 0 && (
                            <CategoryBtn content={category.value} />
                        )}
                    </ul>
                </FormInput>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    취소
                </Button>
                <Button variant="primary" type="submit">
                    등록
                </Button>
            </Modal.Footer>
        </form>
    </Modal>
);

export default SetPostPresenter;
