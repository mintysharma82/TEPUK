import { useQuery } from '@apollo/client';
import { getTopStarRepositoryQuery } from './modules/GraphQl';

interface RepositoryItem {
  node: {
    name: string;
  }
}

export default function Home() {
  const { loading, error, data } = useQuery(getTopStarRepositoryQuery());
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return <>
    <h1>Most Famous Typescript and Javascript libraries</h1>
    <ol>
      {
        data.search.edges.map((item: RepositoryItem) => (
          <li 
            key={item.node.name}>
            {item.node.name}
          </li>
        ))
      }
    </ol>
  </>
}
