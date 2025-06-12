import { Col, Button, Form, Modal, Image, Row } from "react-bootstrap"
import { useContext, useState } from "react"
import { ProfileContext } from "../App"
import { useDispatch } from "react-redux"
import { createPost } from "../features/posts/postsSlice"

export default function AddPostModal({ show, handleClose }) {
    const { image, name } = useContext(ProfileContext)
    const dispatch = useDispatch()
    const [imageUrl, setImageUrl] = useState("")
    const [description, setDescription] = useState("")
    const [invalidUrl, setInvalidUrl] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()

        if (imageUrl) {
            dispatch(createPost({ image: imageUrl, description }))
            setImageUrl("")
            setDescription("")
            handleClose()
        } else {
            setInvalidUrl(true)
        }
    }

    const handleImageError = () => {
        setInvalidUrl(true)
    }

    const handleImageLoad = () => {
        setInvalidUrl(false)
    }

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header>
                <Modal.Title>Create new post</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Row>
                        <Col sm={7} style={{ margin: "0px" }}>
                            <Image src={"https://sig1.co/img-placeholder-1"} alt="uploaded content" onError={handleImageError} onLoad={handleImageLoad} style={{ width: "100%" }} />
                        </Col>
                        <Col sm={5}>
                            <Image src={image} alt="uploader" style={{ width: "32px" }} roundedCircle />
                            <span className="ms-3">{name}</span>
                            <Form.Control className="my-3" placeholder="Add image URL" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} />
                            {invalidUrl && (
                                <div className="text-danger">Invalid URL or failed to load image</div>
                            )}
                            <Form.Control className="my-3" as="textarea" rows={3} placeholder="Write a caption" value={description} onChange={(event) => setDescription(event.target.value)} />
                            <Button type="submit" style={{ width: "100%" }}>Share</Button>
                        </Col>
                    </Row>
                </Modal.Body>
            </Form>
        </Modal>
    )
}