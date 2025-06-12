import { useSelector } from "react-redux"
import { Row, Col, Image, Button } from "react-bootstrap"
import { useState } from "react"
import UpdatePostModal from "./UpdatePostModal"

export default function ImageGrid() {
    const posts = useSelector((state) => state.posts)
    const [show, setShow] = useState(false)
    const [currentPost, setCurrentPost] = useState(null)

    const handleClose = () => {
        setCurrentPost(null)
        setShow(false)
    }

    const handleShow = (post) => {
        setCurrentPost(post)
        setShow(true)
    }

    const renderImages = () => {
        return posts.map((post) => (
            <Col md={4} key={post.id} className="mb-4">
                <Image src={post.image} fluid />
                <Button onClick={() => handleShow(post)} variant="outline-primary">
                    <i className="bi bi-pencil-square"></i>
                </Button>
                <Button variant="outline-danger">
                    <i className="bi bi-trash"></i>
                </Button>
            </Col>
        ))
    }

    return (
        <>
            <Row>{renderImages()}</Row>
            {currentPost && (
                <UpdatePostModal show={show} handleClose={handleClose} postId={currentPost.id} />
            )}
        </>
    )
}