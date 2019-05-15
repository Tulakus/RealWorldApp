import * as React from 'react';

interface IPagination {
    pages: number;
}

export class Pagination extends React.Component<IPagination>{
    createPagination(): any[] | null {
        let pages = [];
        if (this.props.pages === 0)
            return null;
        for (let i = 1; i <= this.props.pages; i++) { //TODO add highlight active page logic 
            pages.push(<li className={i === 1 ? "page-item active" : "page-item"}><a className="page-link">{i}</a></li>)
        }
        return pages;
    }
    render() {

        return <div>
            <ul className="pagination">
                {
                    this.createPagination()
                }
            </ul>
        </div>
    }
}


