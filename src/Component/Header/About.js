import React from 'react'
import '../../css/About.css'

export default function About() {
  return (
    <>
    <div className="MainHeading">
      <h1 className='my-5'>Learn More About Us.</h1>
    </div>

    <div className="container">
      <div className="row">

        <div data-aos="slide-right" className="col-md-6 p-1" >
      <img className='AboutImage' src="https://images.unsplash.com/photo-1489110804417-276c3f517515?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </div>

        <div  className="col-md-6">
          <div className="row">
            <div data-aos="slide-left" className="col-md-6 p-1">
            <img className='AboutImage' src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            </div>
            <div data-aos="slide-left" className="col-md-6 p-1">
            <img className='AboutImage' src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            </div>
            <div data-aos="slide-left" className="col-md-6 p-1">
            <img className='AboutImage' src="https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            </div>
            <div data-aos="slide-left" className="col-md-6 p-1" >
            <img className='AboutImage' src="https://images.unsplash.com/photo-1499728603263-13726abce5fd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            </div>
          </div>
        </div>

      </div>
    </div>

    <div data-aos="slide-left" className="TextBox1 container">
      <p>
Welcome to InspireHub, where creativity finds its voice and ideas come to life. Our platform is designed to be your digital canvas, empowering you to share your thoughts, experiences, and expertise with the world. Whether you're a seasoned writer or just getting started, our user-friendly interface makes it easy to create and organize your blogs. Dive into a world of diverse categories, ranging from lifestyle and technology to travel and personal development. Unleash your imagination, and let your unique perspective shine through. With our sorting features, navigating through the rich tapestry of content is a breeze, ensuring that readers can easily discover the topics that resonate with them. Join our vibrant community of bloggers, where every post is a new chapter waiting to be written. Explore, connect, and let your ideas find their home on Inspirehub.. </p>
    </div>

    <div data-aos="slide-up" className="TextBox2 container">
      <p>
At InspireHub, we believe in the power of storytelling and the magic that happens when diverse voices come together. Our platform isn't just about writing; it's about creating a tapestry of narratives that reflects the richness of human experience. Whether you're sharing travel adventures, tech insights, or life lessons, you're contributing to a mosaic that inspires, informs, and entertains. With easy-to-use tools for blog creation and a range of customizable categories, you have the flexibility to express yourself authentically. Join us in building a community where every blog is a brushstroke, painting a picture of the collective wisdom, creativity, and passion that defines our digital space. Welcome to a place where your words matter, and your story is an integral part of something much larger.. </p>
    </div>


    <div className="TextBox3  container">
      <div className="row">
        {/* 1 */}
        <div data-aos="slide-up" className="col-md-6">
          <h2>Who we are.</h2>
          <p>What sets us apart is our commitment to fostering an inclusive environment where everyone's unique perspective is valued. We celebrate the beauty in diversity, and our platform reflects the myriad of interests, ideas, and narratives that make up the tapestry of human existence.</p>
        </div>

        {/* 2 */}
        <div data-aos="slide-up" className="col-md-6">
          <h2>Our Mission.</h2>
          <p> Our mission is to empower individuals to amplify their voices and share their stories with the world. We believe in the transformative power of diverse perspectives, recognizing that every person has a unique narrative that contributes to the richness of human experience.</p>
        </div>

        {/* 3 */}
        <div data-aos="slide-up" className="col-md-6">
          <h2>Our Vision.</h2>
          <p>our vision is to cultivate a global digital ecosystem that transcends geographical boundaries and unites individuals through the universal power of storytelling. We envision a platform where diverse voices converge, creating a mosaic of ideas, perspectives, and experiences that reflect the vast tapestry of human life. </p>
        </div>

        {/* 4 */}
        <div data-aos="slide-up" className="col-md-6">
          <h2>Our Values.</h2>
          <p> Our values form the bedrock of our community, shaping the ethos that guides our every endeavor. We are committed to upholding a set of principles that foster a positive, inclusive, and enriching environment for our users. </p>
        </div>
      </div>
    </div>


    </>
  )
}
