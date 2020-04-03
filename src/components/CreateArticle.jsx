import React, { Component } from "react";
import { connect } from "react-redux";
import { TextArea, TextInput, Button, Form, Box, CheckBox } from "grommet";
import axios from "axios";
import ImageUploading from "react-images-uploading"
class CreateArticle extends Component {
  state = {
    image: []
  }

  articleCreation = async event => {
    event.preventDefault()
    let headers = JSON.parse(localStorage.getItem('J-tockAuth-Storage'));
    let articleClass;
    if (event.target.premium.checked === true) {
      articleClass = "premium";
    } else {
      articleClass = "free";
    }

    try {
      let response = await axios.post("/articles", {
        article: {
          title: event.target.title.value,
          teaser: event.target.teaser.value,
          content: event.target.content.value,
          image: this.state.image,
          article_class: articleClass
        },
      },
      {headers: headers}
      );

      this.props.dispatch({
        type: "ARTICLE_SUBMITTED",
        payload: { message: response.data.message }
      });

    } catch (error) {
      this.props.dispatch({
        type: "ARTICLE_SUBMITTED",
        payload: { message: error.message }
      });
    }
  };

  onImageDropHandler = imageList => {
    if (imageList.length > 0) {
      this.setState({
        image: imageList[0].dataURL
      });
    }
  };

  render() {
    return (
      <>
        <h1>Let's create some magic...</h1>
        <Form className="create-article" onSubmit={this.articleCreation}>
          <CheckBox
            name="premium"
            className="premium"
            id="premium"
            label="Premium"
          />

          <TextInput
            className="title"
            placeholder="This is where you write your title"
            key="title"
            id="title"
            required={true}
          />
          <TextArea
            className="teaser"
            placeholder="This is where you write your teaser"
            key="teaser"
            id="teaser"
            required={true}
          />
          <TextArea
            className="content"
            placeholder="This is where you write your content"
            key="content"
            id="content"
            required={true}
          />

          <ImageUploading onChange={this.onImageDropHandler}>
            {({ onImageUpload }) => (
              <div>
              <TextInput onClick={onImageUpload} type="file">
        
              </TextInput>

              <Button onClick={onImageUpload}>
              Upload an image
              </Button>
              </div>
            )}
          </ImageUploading>

          <Button label="Submit Article" type="submit" />
          <Button
            label="Go Back"
            onClick={() => this.props.dispatch({ type: "HIDE_CREATE" })}
          />
        </Form>
        <Box className="message">{this.props.message}</Box>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    message: state.message
  };
};

export default connect(mapStateToProps)(CreateArticle);
