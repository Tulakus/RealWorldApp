import { ThunkDispatch } from "redux-thunk";
import {
  addArticle,
  getArticleEdit,
  IAddArticleRequest,
  updateArticle
} from "../helpers/apiHelper";
import { navigate } from "../helpers/helper";
import { IArticle } from "../interfaces/IArticle";
import { IError } from "../interfaces/IError";
import { IAppState } from "../store/rootReducer";
import { changeValue, IChangeValueAction } from "./actions/changeValueAction";

const ARTICLE_VALUE_CHANGED = "ARTICLE_VALUE_CHANGED";
const TAG_ADDED = "TAG_ADDED";
export const FETCH_EDIT_ARTICLE_SUCCESS = "FETCH_EDIT_ARTICLE_SUCCESS";
const EDITOR_LEFT = "EDITOR_LEFT";

interface IArticleValueChanged
  extends IChangeValueAction<typeof ARTICLE_VALUE_CHANGED> {}
interface ITagAddedAction {
  type: typeof TAG_ADDED;
  tag: string;
}

interface IArticleEditedAction {
  type: typeof FETCH_EDIT_ARTICLE_SUCCESS;
  payload: string;
}

interface IOnDestroyArticleEditorAction {
  type: typeof EDITOR_LEFT;
}

function addTag(tag: string): ITagAddedAction {
  return {
    tag,
    type: TAG_ADDED
  };
}

type ArticleActionTypes =
  | IArticleValueChanged
  | ITagAddedAction
  | IArticleEditedAction
  | IOnDestroyArticleEditorAction;

function createInitState() {
  return {
    about: "",
    content: "",
    editing: false,
    tag: "",
    tagList: [],
    title: ""
  };
}
const initialState: IArticleEditorState = createInitState();

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
    case FETCH_EDIT_ARTICLE_SUCCESS:
      const article: IArticle = JSON.parse(action.payload).article;
      return {
        about: article.description,
        content: article.body,
        editing: true,
        tag: "",
        tagList: article.tagList,
        title: article.title
      };
    case EDITOR_LEFT:
      return createInitState();
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
  editing: boolean;
}

interface IMapStateToProps {
  title: string;
  about: string;
  content: string;
  tag: string;
  tagList: string[];
  errors?: IError;
  editing: boolean;
}

export const mapStateToProps = (
  state: IAppState,
  ownprops: any
): IMapStateToProps => {
  return {
    about: state.editor.about,
    content: state.editor.content,
    editing: state.editor.editing,
    errors: state.error.errors,
    tag: state.editor.tag,
    tagList: state.editor.tagList,
    title: state.editor.title
  };
};

interface IMapDispatchToProps {
  addSubmit: (data: IAddArticleRequest) => void;
  editSubmit: (data: IAddArticleRequest, slug: string) => void;
  onValueChange: (key: string, value: string) => void;
  onTagAdd: (value: string) => void;
  getArticle: (slug: string) => void;
  onDestroy: () => void;
}

export const mapDispatchToProps = (
  dispatch: ThunkDispatch<IArticleEditorState, {}, any>,
  ownprops: any
): IMapDispatchToProps => {
  return {
    addSubmit: async (data: IAddArticleRequest) => {
      try {
        const response = await dispatch(addArticle(data));
        navigate(ownprops, `/article/${response.article.slug}`);
      } catch (e) {
        console.log(e); // todo: better error handling
      }
    },
    editSubmit: async (data: IAddArticleRequest, slug: string) => {
      try {
        const response = await dispatch(updateArticle(data, slug));
        navigate(ownprops, `/article/${response.article.slug}`);
      } catch (e) {
        console.log(e); // todo: better error handling
      }
    },
    getArticle: (slug: string) => {
      dispatch(getArticleEdit(slug));
    },
    onDestroy: () => dispatch({ type: EDITOR_LEFT }),
    onTagAdd: value => dispatch(addTag(value)),
    onValueChange: (key: string, value: string) =>
      dispatch(
        changeValue<typeof ARTICLE_VALUE_CHANGED>(
          key,
          value,
          ARTICLE_VALUE_CHANGED
        )
      )
  };
};

export interface IArticleEditorProps
  extends IMapStateToProps,
    IMapDispatchToProps {}
