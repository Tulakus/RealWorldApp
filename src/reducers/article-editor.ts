import { ThunkDispatch } from "redux-thunk";
import { addArticle, IAddArticleRequest } from "../helpers/apiHelper";
import { navigate } from "../helpers/helper";
import { IError } from "../interfaces/IError";
import { IAppState } from "../store/rootReducer";
import { changeValue, IChangeValueAction } from "./actions/changeValueAction";

const ARTICLE_VALUE_CHANGED = "ARTICLE_VALUE_CHANGED";
const TAG_ADDED = "TAG_ADDED";

interface IArticleValueChanged
  extends IChangeValueAction<typeof ARTICLE_VALUE_CHANGED> {}
interface ITagAddedAction {
  type: typeof TAG_ADDED;
  tag: string;
}

function addTag(tag: string): ITagAddedAction {
  return {
    tag,
    type: TAG_ADDED
  };
}

type ArticleActionTypes = IArticleValueChanged | ITagAddedAction;

const initialState: IArticleEditorState = {
  about: "",
  content: "",
  tag: "",
  tagList: [],
  title: ""
};

export function editorReducer(
  state: IArticleEditorState = initialState,
  action: ArticleActionTypes
): IArticleEditorState {
  switch (action.type) {
    case ARTICLE_VALUE_CHANGED:
      return { ...state, [action.key]: action.value };
    case TAG_ADDED:
      return {
        ...state,
        tag: "",
        tagList: [...state.tagList, action.tag]
      };
    default:
      return state;
  }
}

export interface IArticleEditorState {
  title: string;
  about: string;
  content: string;
  tag: string;
  tagList: string[];
}

interface IMapStateToProps {
  title: string;
  about: string;
  content: string;
  tag: string;
  tagList: string[];
  errors?: IError;
}

export const mapStateToProps = (
  state: IAppState,
  ownprops: any
): IMapStateToProps => {
  return {
    about: state.editor.about,
    content: state.editor.content,
    errors: state.error.errors,
    tag: state.editor.tag,
    tagList: state.editor.tagList,
    title: state.editor.title
  };
};

interface IMapDispatchToProps {
  submit: (data: IAddArticleRequest) => void;
  onValueChange: (key: string, value: string) => void;
  onTagAdd: (value: string) => void;
}

export const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>,
  ownprops: any
): IMapDispatchToProps => {
  return {
    onTagAdd: value => dispatch(addTag(value)),
    onValueChange: (key: string, value: string) =>
      dispatch(
        changeValue<typeof ARTICLE_VALUE_CHANGED>(
          key,
          value,
          ARTICLE_VALUE_CHANGED
        )
      ),
    submit: async (data: IAddArticleRequest) => {
      try {
        const response = await dispatch(addArticle(data));
        navigate(ownprops, `/article/${response.article.slug}`);
      } catch (e) {
        console.log(e); // todo: better error handling
      }
    }
  };
};

export interface IProps extends IMapStateToProps, IMapDispatchToProps {}
