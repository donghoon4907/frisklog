import React from "react";
import { Modal, Button } from "react-bootstrap";
import { FormInput } from "../Form";
import Loader from "../Loader";
import Editor from "../Editor";
import CategoryBtn from "../button/Category";

/**
 * 게시물 설정 모달 컨테이너 컴포넌트
 *
 * @param {string}   props.id
 * @param {boolean}   props.loading
 * @param {string}   props.category
 * @param {string}   props.content
 * @param {function} props.setContent
 * @param {function} props.onClose
 * @param {function} props.onSubmit
 */
const SetPostPresenter = ({
    id,
    loading,
    category,
    content,
    setContent,
    onClose,
    onSubmit,
    onChange
}) => (
    <Modal onHide={onClose} show animation={false}>
        {loading && <Loader />}
        <Modal.Header closeButton>
            <Modal.Title>게시물 {id ? "수정" : "등록"}</Modal.Title>
        </Modal.Header>
        <form onSubmit={onSubmit}>
            <Modal.Body>
                <Editor
                    height="50vh"
                    onChange={(content) => setContent(content)}
                    initialValue={content}
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
                    {id ? "수정" : "등록"}
                </Button>
            </Modal.Footer>
        </form>
    </Modal>
);

export default SetPostPresenter;
