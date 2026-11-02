import profileImage from '../assets/profile-landing.jpg'

export default function Hero() {
  return (
    <article className="bio">
      <div className="row">
        <div className="col50">
          <div className="bio-content">
            <h1 className="bio-name">Ariah McKee</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus eveniet ad aspernatur quam
              voluptatem nobis molestiae? Debitis ad eaque assumenda officiis.
            </p>
          </div>
        </div>

        <div className="col50">
          <div className="box">
            <div className="imgbx">
              <img src={profileImage} alt="Profile Pic" />
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
