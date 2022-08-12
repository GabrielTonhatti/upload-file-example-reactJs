import { Component } from "react";
import { uniqueId } from "lodash";
import filesize from "filesize";
import FileList from "./components/FileList";
import Upload from "./components/Upload";
import { Container, Content } from "./styles";
import GlobalStyle from "./styles/global";
import api from "./services/api";
import Snackbar from "./components/snackbar/Snackbar";

class App extends Component {
    state = {
        uploadedFiles: [],
        someStateOpen: false,
        message: null,
        type: null,
    };

    async componentDidMount() {
        const response = await api.get("posts");

        this.setState({
            uploadedFiles: response.data.map((file) => ({
                id: file._id,
                name: file.name,
                readableSize: filesize(file.size),
                preview: file.url,
                uploaded: true,
                url: file.url,
            })),
        });
    }

    handleUpload = (files) => {
        const uploadedFiles = files.map((file) => ({
            file,
            id: uniqueId(),
            name: file.name,
            readableSize: filesize(file.size),
            preview: URL.createObjectURL(file),
            progress: 0,
            uploaded: false,
            error: false,
            url: null,
        }));

        this.setState({
            uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles),
        });

        uploadedFiles.forEach(this.processUpload);
    };

    updateFile = (id, data) => {
        this.setState({
            uploadedFiles: this.state.uploadedFiles.map((uploadedFile) => {
                return uploadedFile.id === id
                    ? { ...uploadedFile, ...data }
                    : uploadedFile;
            }),
        });
    };

    processUpload = (uploadedFile) => {
        const data = new FormData();
        data.append("file", uploadedFile.file, uploadedFile.name);

        api.post("posts", data, {
            onUploadProgress: (e) => {
                const progress = parseInt(
                    Math.round((e.loaded * 100) / e.total)
                );

                this.updateFile(uploadedFile.id, {
                    progress,
                });
            },
        })
            .then((response) => {
                this.updateFile(uploadedFile.id, {
                    uploaded: true,
                    id: response.data._id,
                    url: response.data.url,
                });

                this.setState({
                    message: "Imagem importada com sucesso",
                    someStateOpen: true,
                    type: "success",
                });
            })
            .catch((error) => {
                this.setState({
                    message: error.response.data.message,
                    someStateOpen: true,
                    type: "error",
                });

                this.updateFile(uploadedFile.id, {
                    error: true,
                });
            });

        this.handleCloseAutomatically();
    };

    handleDelete = async (id) => {
        await api.delete(`posts/${id}`);

        this.setState({
            uploadedFiles: this.state.uploadedFiles.filter(
                (file) => file.id !== id
            ),
        });
    };

    componentWillUnmount() {
        this.state.uploadedFiles.forEach((file) =>
            URL.revokeObjectURL(file.preview)
        );
    }

    handleClose = () => {
        this.setState({ someStateOpen: false });
    };

    handleCloseAutomatically = () => {
        setTimeout(() => {
            this.setState({ someStateOpen: false });
        }, 5000);
    };

    render() {
        const { uploadedFiles, someStateOpen, message, type } = this.state;

        return (
            <Container>
                <Content>
                    <Upload onUpload={this.handleUpload} />
                    {!!uploadedFiles.length && (
                        <FileList
                            files={this.state.uploadedFiles}
                            onDelete={this.handleDelete}
                        />
                    )}
                </Content>
                <GlobalStyle />

                {message && (
                    <Snackbar
                        type={type}
                        open={someStateOpen}
                        onClose={this.handleClose}
                    >
                        {message}
                    </Snackbar>
                )}
            </Container>
        );
    }
}

export default App;
