// import PropTypes from 'prop-types'
import ListAll from './ListAll'
import useData from '#hook/useData'
import Loading from '#components/Loading'

const ComPC = () => {

    const [data, loadung, refetch] = useData({
        url: `/com`,
        method: "get",
    });

    return (
        <div className='flex flex-col justify-center items-center gap-2 w-full h-full'>
            <h1>ComPC</h1>
            <button onClick={refetch}>refetch</button>
            {loadung ? <Loading /> : <ListAll dataArr={data} />}
        </div>
    )
}

ComPC.propTypes = {}

export default ComPC