import { boundMethod } from "autobind-decorator";
import * as React from "react";
import { connect } from "react-redux";
import { ErrorList } from "../components/error-list";
import {
  IProps,
  mapDispatchToProps,
  mapStateToProps
} from "../reducers/article-editor";

class ArticleEditor extends React.Component<IProps> {
  @boundMethod
  public onValueChange(e: any, key: string) {
    this.props.onValueChange(key, e.target.value);
  }
  public render() {
    return (
      <div className="editor-page">
        <div className="container page">
          <ErrorList errors={this.props.errors} />
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <form>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Article Title"
                      onChange={e => this.onValueChange(e, "title")}
                      value={this.props.title}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="What's this article about?"
                      onChange={e => this.onValueChange(e, "about")}
                      value={this.props.about}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      rows={8}
                      placeholder="Write your article (in markdown)"
                      onChange={e => this.onValueChange(e, "content")}
                      value={this.props.content}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter tags"
                      onChange={e => this.onValueChange(e, "tag")}
                      value={this.props.tag}
                      // tslint:disable-next-line:no-debugger
                      onKeyPress={e => {
                        if (e.key === "Enter") {
                          this.props.onTagAdd(this.props.tag);
                        }
                      }}
                    />
                    <div className="tag-list">{this.props.tagList}</div>
                  </fieldset>
                  <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="button"
                    onClick={() =>
                      this.props.submit({
                        article: {
                          body: this.props.content,
                          description: this.props.about,
                          tagList: this.props.tagList,
                          title: this.props.title
                        }
                      })
                    }
                  >
                    Publish Article
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleEditor);
