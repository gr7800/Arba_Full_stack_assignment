import React, { useEffect } from 'react';
import styles from './MyStore.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from '../../redux/categories/categories.action';
import { getProduct } from '../../redux/products/products.action';
import ProductPage from '../../components/ProductPage/ProductPage';

const MyStore = () => {

  const dispatch = useDispatch();

  let categories = useSelector((store) => store.category.data)
  let data = useSelector((store) => store.prod.product);

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getProduct());
  }, [])

  console.log(categories)
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h2>Categories Page</h2>
        <div className={styles.buttons}>
          <button>Refresh</button>
          <button>Add</button>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Slug</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td><img src={categories.image} alt="image" /></td>
                <td>{category.name}</td>
                <td>{category.slug}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className={styles.section}>
        <h2>Products Page</h2>
        <div className={styles.buttons}>
          <button>Refresh</button>
          <button>Add</button>
        </div>
        {data && data.length > 0 && <ProductPage data={data} />}
      </section>
    </div>
  );
};

export default MyStore;
