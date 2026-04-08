import { use, useEffect, useState } from "react";
import { Container, Table, Card, Row, Col, Button, Modal, Form} from "react-bootstrap";
import NavbarComponent from "../components/NavbarComponent";
import api from "../utils/api";
import Swal from "sweetalert2";

function DashboardPage() {
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);
const [show, setShow] = useState(false);
const [errors, setErrors] = useState({})
const [formdata, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role_id: "",
});

console.log(formdata);

const [isEdit, setIsEdit] = useState(false);
const [currentId, setCurrentId] = useState(null);


const handleDelete =  (id) => {
    Swal.fire({
        icon: "warning",
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        showCancelButton: true,
        cancelButtonColor: "#3085d6",
        confirmButtonColor: "#d33",
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes, delete it!",
    }).then(async(result) => {
        if(result.isConfirmed){
            try{
                const res = await api.delete(`/users/${id}`);
                Swal.fire("Deleted", res.data.message, "success");
                fetchUsers();
            } catch(error){
                console.log(error);
                Swal.fire("Failed", "Failed to delete user", "error");
            }
        }
    });
};
const handleChange = (e) => {
    setFormData({
    ...formdata,
    [e.target.name]: e.target.value,
    });
};

const handleClose = () =>{
    setShow(false);
    setIsEdit(false);
    setFormData({ name:"", email:"", password:"", role_id:""});
};

const handleShow = () => {
    setShow(true);
};

const fetchUsers = async () => {
    try {
    const res = await api.get("/users");
    setUsers(res.data?.data);
    } catch (error) {
    console.log(error);
    Swal.fire("Error", "Failed to fetch users", "error");
    } finally {
    setLoading(false);
    }

    console.log(users);
};

const handleEdit = (user) => {
    setIsEdit(true);
    setCurrentId(user.id);
    setFormData({
        name: user.name,
        email: user.email,
        password: "",
        role_id: user.role_id        
    });
    setShow(true);
};

const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
        if(isEdit){
            const res = await api.put(`/users/${currentId}`, formdata);
            Swal.fire("Success!", res.data.message, "success");
            handleClose();
            fetchUsers();
            setFormData({ name: "", email: "", password: "", role_id: "" });
        } else {
            const res = await api.post("/users", formdata);
            Swal.fire("Success!", res.data.message, "success");
            handleClose();
            fetchUsers();
            setFormData({ name: "", email: "", password: "", role_id: "" });
        }
        
    } catch (error) {
        console.log(error);
        if(error.response && error.response.status === 422){
            setErrors(error.response.data?.errors);
        } else {
            Swal.fire("Error", "Failed to create new user", "error");
        }
    }
};

useEffect(() => {
    fetchUsers();
  }, []); //cukup 1 kali perintah fetchUSers/users dijalankan

return (
    <>
    <NavbarComponent />
    <Container className="mt-5">
        <Row className="justify-content-center">
        <Col md={12}>
            <Card>
            <Card.Body>
                <div className="d-flex justify-content-between mb-3">
                <h3>Data User</h3>
                <Button variant="primary" onClick={handleShow}>
                  Create New User
                </Button>
                </div>
                

                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? (
                      users.map((user, index) => (
                        <tr key={user.id}>
                          <td>{index + 1}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td> <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(user)}>Edit</Button> | <Button variant="danger" size="sm" className="me-2" onClick={() => handleDelete(user.id)}>Delete</Button></td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="text-center">
                        Data Empty
                        </td>
                    </tr>
                    )}
                </tbody>
                </Table>

                <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEdit ? 'Edit User' : 'Create New User'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
        <Form.Label className="form-label">Name</Form.Label>
        <Form.Control
            isInvalid={!!errors.name}
            name="name"
            type="text"
            placeholder="Enter Your name"
            onChange={handleChange}
            value={formdata.name}
        ></Form.Control>
        <Form.Control.Feedback type="invalid">
            {errors.name?.[0]}
        </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
        <Form.Label className="form-label">Email</Form.Label>
        <Form.Control
            isInvalid={!!errors.email}
            name="email"
            type="email"
            placeholder="Enter Your Email"
            onChange={handleChange}
            value={formdata.email}
        ></Form.Control>
        <Form.Control.Feedback type="invalid">
            {errors.email?.[0]}
        </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
        <Form.Label className="form-label">Password</Form.Label>
        <Form.Control
            isInvalid={!!errors.password}
            name="password"
            type="password"
            placeholder="Enter Your Password"
            onChange={handleChange}
            
        ></Form.Control>
        <Form.Control.Feedback type="invalid">
            {errors.password?.[0]}
        </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
<Form.Label className="form-label">Role</Form.Label>

<Form.Select
    name="role_id"
    onChange={handleChange}
    value={formdata.role_id}
>
    <option value="">Select Role</option>
    <option value="1">Admin</option>
    <option value="2">User</option>
</Form.Select>

</Form.Group>


                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
                    <Button type="submit">
                    {isEdit ? 'Update' : 'Save'}
                    </Button>
                </Modal.Footer>
            </Form>
                </Modal.Body>
                
                </Modal>
            </Card.Body>
            </Card>
        </Col>
        </Row>
    </Container>
    </>
);
}

export default DashboardPage;
